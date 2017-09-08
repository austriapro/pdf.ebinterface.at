package at.austriapro.pdfebinterface.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Dummy {

  public String uuid;
  public String name;
  public String email;

}
