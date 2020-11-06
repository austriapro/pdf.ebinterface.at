package at.austriapro.pdfebinterface.controller;

import java.io.Serializable;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.cache.Cache;

import at.austriapro.pdfebinterface.rendering.EbinterfaceRenderer;

@RestController
@RequestMapping ("/api/convert")
public class ConverterController
{
  private static final Logger LOGGER = LoggerFactory.getLogger (ConverterController.class);

  @Autowired
  private EbinterfaceRenderer renderer;

  @Autowired
  private Cache <String, byte []> fileCache;

  /**
   * curl -i -X POST -H "Content-Type: multipart/form-data" -F
   * "name=the-file-name" -F "file=@testfile.xml"
   * http://127.0.0.1:8080/api/convert
   *
   * @param name
   *        Filename
   * @param file
   *        File payload
   * @return {@link UploadResponse} with the UUID
   */
  @PostMapping
  public UploadResponse uploadFile (@RequestParam ("name") final String name,
                                    @RequestParam ("file") final MultipartFile file) throws Exception
  {

    final String uuid = UUID.randomUUID ().toString ();
    final StopWatch watch = new StopWatch ();
    watch.start ();
    LOGGER.info ("Generating pdf using uuid {}", uuid);
    final byte [] pdf = renderer.renderEbinterface (file.getBytes ());
    fileCache.put (uuid, pdf);
    watch.stop ();
    LOGGER.info ("Rendered pdf in " + watch.getTotalTimeMillis () + " ms. File cache contains " + fileCache.size () + " items");
    return new UploadResponse (uuid);
  }

  /**
   * curl -i http://127.0.0.1:8080/api/convert/{uuid}
   *
   * @param uuid
   *        UUID to query
   * @param response
   *        HTTP Servlet Response to fill
   * @return File content
   */
  @GetMapping ("/{uuid}.pdf")
  public byte [] downloadFile (@PathVariable final String uuid, final HttpServletResponse response)
  {
    LOGGER.info ("Client retrieves pdf with uuid " + uuid + ". File cache contains " + fileCache.size () + " items.");
    final byte [] file = fileCache.getIfPresent (uuid);

    if (file == null)
    {
      throw new RuntimeException ("Unable to retrieve file with uuid " + uuid);
    }

    response.setHeader ("Content-Type", "application/pdf");
    response.setHeader ("Content-Disposition", String.format ("attachment; filename='%s.pdf'", uuid));

    return file;
  }

  public static class UploadResponse implements Serializable
  {
    private final String uuid;

    public UploadResponse (final String sUUID)
    {
      uuid = sUUID;
    }

    public String getUUID ()
    {
      return uuid;
    }
  }

}
