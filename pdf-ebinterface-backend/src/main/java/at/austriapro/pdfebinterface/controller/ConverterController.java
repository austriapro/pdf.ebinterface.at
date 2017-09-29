package at.austriapro.pdfebinterface.controller;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.multipart.MultipartFile;

    import java.util.UUID;

    import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/convert")
public class ConverterController {

  /**
   * curl -i -X POST -H "Content-Type: multipart/form-data" -F "name=the-file-name" -F "file=@testfile.xml" http://127.0.0.1:8080/api/convert
   */
  @PostMapping
  public ResponseEntity<String> uploadFile(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
    // TODO
    return ResponseEntity.ok(UUID.randomUUID().toString());
  }
}
