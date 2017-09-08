package at.austriapro.pdfebinterface.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.annotation.PostConstruct;

import at.austriapro.pdfebinterface.entity.Dummy;

/**
 * Throwaway test controller.
 */
@RestController
@RequestMapping("/api")
public class DummyController {

  private Random random = new Random();

  private List<Dummy> dummies = new ArrayList<>();


  @PostConstruct
  public void init() {
    dummies.add(Dummy.builder().name("foo").email("foo@example.com").uuid("1").build());
    dummies.add(Dummy.builder().name("bar").email("bar@example.com").uuid("2").build());
  }

  @GetMapping("/dummies")
  public List<Dummy> getDummies() throws InterruptedException {

    int rd = random.nextInt(100);


    // fake random failures.
    if (rd > 80) {
      throw new RuntimeException("Internal Server Error");
    }

    // fake latency
    Thread.sleep(2000);

    return dummies;
  }

  @PostMapping("/dummy")
  public Dummy postDummy(@RequestBody Dummy dummy) {

    if (dummy.getUuid() != null) {
      throw new RuntimeException("Cannot create new dummy with existing uuid");
    }

    dummy.setUuid(UUID.randomUUID().toString());
    dummies.add(dummy);
    return dummy;
  }

}
