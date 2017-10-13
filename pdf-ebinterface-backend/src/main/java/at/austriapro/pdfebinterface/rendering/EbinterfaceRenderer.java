package at.austriapro.pdfebinterface.rendering;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

import javax.annotation.PostConstruct;

import at.austriapro.rendering.BaseRenderer;

@Component
public class EbinterfaceRenderer extends BaseRenderer {

  @Value("classpath:jasper/ebInterface.jrxml")
  private Resource jasperTemplate;

  @Value("classpath:jasper/dummy-logo.jpg")
  private Resource dummyLogoResource;

  private byte[] template;

  @PostConstruct
  public void loadTemplate() throws IOException {
    template = IOUtils.toByteArray(jasperTemplate.getURI());
  }

  public byte[] renderEbinterface(byte[] xml) throws Exception {
    return renderReport(template, xml, dummyLogoResource.getInputStream());
  }

}
