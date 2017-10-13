package at.austriapro.pdfebinterface;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class PdfEbinterfaceBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(PdfEbinterfaceBackendApplication.class, args);
  }


  @Bean
  public Cache<String, byte[]> fileCache() {
    return CacheBuilder.newBuilder()
      .maximumSize(1000)
      .expireAfterWrite(10, TimeUnit.MINUTES)
      .build();
  }

}
