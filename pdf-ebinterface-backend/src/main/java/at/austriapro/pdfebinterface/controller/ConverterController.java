package at.austriapro.pdfebinterface.controller;

import com.google.common.cache.Cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.Serializable;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import at.austriapro.pdfebinterface.rendering.EbinterfaceRenderer;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/convert")
public class ConverterController {

  @Autowired
  private EbinterfaceRenderer renderer;

  @Autowired
  private Cache<String, byte[]> fileCache;

  /**
   * curl -i -X POST -H "Content-Type: multipart/form-data" -F "name=the-file-name" -F "file=@testfile.xml" http://127.0.0.1:8080/api/convert
   */
  @PostMapping
  public UploadResponse uploadFile(@RequestParam("name") String name, @RequestParam("file") MultipartFile file)
      throws Exception {

    String uuid = UUID.randomUUID().toString();
    StopWatch watch = new StopWatch();
    watch.start();
    log.info("Generating pdf using uuid {}", uuid);
    byte[] pdf = renderer.renderEbinterface(file.getBytes());
    fileCache.put(uuid, pdf);
    watch.stop();
    log.info("Rendered pdf in {} ms. File cache contains {} items", watch.getTotalTimeMillis(), fileCache.size());
    return new UploadResponse(uuid);
  }

  /**
   * curl -i http://127.0.0.1:8080/api/convert/{uuid}
   */
  @GetMapping("/{uuid}.pdf")
  public byte[] downloadFile(@PathVariable String uuid, HttpServletResponse response) {

    log.info("Client retrieves pdf with uuid {}. File cache contains {} items.", uuid, fileCache.size());
    byte[] file = fileCache.getIfPresent(uuid);

    if (file == null) {
      throw new RuntimeException("Unable to retrieve file with uuid " + uuid);
    }

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", String.format("attachment; filename='%s.pdf'", uuid));

    return file;
  }

  @Data
  public static class UploadResponse implements Serializable {
    private final String uuid;
  }

}
