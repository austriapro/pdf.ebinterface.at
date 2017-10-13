package at.austriapro.pdfebinterface.controller;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.Serializable;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/convert")
public class ConverterController {

  private Cache<String, byte[]> files = CacheBuilder.newBuilder()
      .maximumSize(1000)
      // TODO: expiry
//      .expireAfterWrite(10, TimeUnit.MINUTES)
//      .expireAfterAccess(10, TimeUnit.SECONDS)
      .build();

  /**
   * curl -i -X POST -H "Content-Type: multipart/form-data" -F "name=the-file-name" -F "file=@testfile.xml" http://127.0.0.1:8080/api/convert
   */
  @PostMapping
  public UploadResponse uploadFile(@RequestParam("name") String name, @RequestParam("file") MultipartFile file)
          throws IOException, InterruptedException {

    String uuid = UUID.randomUUID().toString();
    log.info("Genarating pdf using uuid {}", uuid);
    files.put(uuid, file.getBytes());
    log.info("File cache contains {} items", files.size());
    return new UploadResponse(uuid);
  }

  /**
   * curl -i http://127.0.0.1:8080/api/convert/{uuid}
   */
  @GetMapping("/{uuid}")
  public Resource downloadFile(@PathVariable String uuid, HttpServletResponse response) {
    log.info("Client retrieves pdf with uuid {}. File cache contains {} items.", uuid, files.size());
    byte[] file = files.getIfPresent(uuid);

    if (file == null) {
      throw new RuntimeException("Unable to retrieve file with uuid " + uuid);
    }

    response.setHeader("Content-Type", "application/octet-stream");
    response.setHeader("Content-Disposition", String.format("attachment; filename='%s.xml'", uuid));

    return new ByteArrayResource(file);
  }

  @Data
  public static class UploadResponse implements Serializable {
    private final String uuid;
  }

}
