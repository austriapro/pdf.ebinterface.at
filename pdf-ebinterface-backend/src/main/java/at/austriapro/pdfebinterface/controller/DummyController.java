package at.austriapro.pdfebinterface.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import at.austriapro.pdfebinterface.entity.Dummy;

/**
 * Throwaway test controller.
 */
@RequestMapping("/api")
@RestController
public class DummyController {


  @GetMapping("/dummies")
  public List<Dummy> getDummies() {
    List<Dummy> dummies = new ArrayList<>();
    dummies.add(Dummy.builder().name("foo").email("foo@example.com").uuid("1").build());
    dummies.add(Dummy.builder().name("bar").email("bar@example.com").uuid("2").build());

    return dummies;
  }

  @PostMapping("/dummy")
  public Dummy postDummy(Dummy dummy) {
    dummy.setUuid(UUID.randomUUID().toString());
    return dummy;
  }
}
