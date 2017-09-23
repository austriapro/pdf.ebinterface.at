package at.austriapro.pdfebinterface.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

import javax.annotation.PostConstruct;

import at.austriapro.pdfebinterface.entity.Dummy;

/**
 * Throwaway test controller.
 */
@RestController
@RequestMapping("/api")
public class DummyController {

  private Random random = new Random();

  //Dummy data store
  private HashMap<String, Dummy> dummies = new HashMap<>();


  @PostConstruct
  public void init() {
    dummies.put("1", Dummy.builder().name("foo").email("foo@example.com").uuid("1").build());
    dummies.put("2", Dummy.builder().name("bar").email("bar@example.com").uuid("2").build());
    dummies.put("3", Dummy.builder().name("foobar").email("foobar@example.com").uuid("3").build());
  }


  /**
   * Get a single one
   * @param uuid
   * @return
   */
  @GetMapping("/dummy/{uuid}")
  public Dummy getDummy(@PathVariable String uuid) {
    return dummies.get(uuid);
  }


  /**
   * Get all
   * @return
   * @throws InterruptedException
   */
  @GetMapping("/dummies")
  public List<Dummy> getDummies() throws InterruptedException {
    return new ArrayList<>(dummies.values());
  }



  /**
   * Add a single one
   * @param dummy
   * @return
   */
  @PostMapping("/dummy")
  public Dummy postDummy(@RequestBody Dummy dummy) {

    if (dummy.getUuid() != null) {
      throw new RuntimeException("Cannot create new dummy with existing uuid");
    }

    dummy.setUuid(UUID.randomUUID().toString());
    dummies.put(dummy.getUuid(), dummy);
    return dummy;
  }

  /**
   * Add a bunch
   * @param postedDummies
   * @return
   */
  @PostMapping("/dummies")
  public List<Dummy> postDummies(@RequestBody List<Dummy> postedDummies) {

    List<Dummy> added = new ArrayList<>();
    postedDummies.forEach((d) -> {
      if (!dummies.containsKey(d.getUuid())) {
        dummies.put(d.getUuid(), d);
        added.add(d);
      }
    });

    return added;

  }


  /**
   * Delete a single one
   * @param uuid
   * @return
   */
  @DeleteMapping("/dummy/{uuid}")
  public String deleteDummy(@PathVariable String uuid) {

    if (uuid == null) {
      throw new RuntimeException("Cannot delete a dummy without a UUID");
    }

    Dummy d = dummies.remove(uuid);

    if (d == null) {
      return String.format("Unable to delete dummy %s. Dummy could not be found.", uuid);
    }
    else {
      return String.format("Deleted dummy %s", uuid);
    }
  }

  /**
   * Delete a bunch
   * @param dummyToDelete
   * @return
   */
  @DeleteMapping("/dummies")
  public List<Dummy> deleteDummies(@RequestBody List<Dummy> dummyToDelete) {

      List<Dummy> deletedEntries = new ArrayList<>();

      for (Dummy d : dummyToDelete) {
        Dummy deletedEntry = dummies.remove(d.getUuid());
        if (deletedEntry != null) {
          deletedEntries.add(deletedEntry);
        }
      }

      return deletedEntries;
  }


  /**
   * Update a single one. If it does not exist - add it
   * @param dummy
   * @param uuid
   * @return
   */
  @PutMapping("/dummy/{uuid}")
  public Dummy updateDummy(@RequestBody Dummy dummy, @PathVariable String uuid) {

    if (uuid == null) {
      throw new RuntimeException("Cannot update a dummy without a UUID");
    }
    //UUID from path takes precendence over uuid in the request body
    dummy.setUuid(uuid);
    dummies.put(uuid, dummy);
    return dummy;
  }


  /**
   * Update a bunch. If an entry does not exist, add it.
   * @param dummyList
   * @return
   */
  @PutMapping("/dummies")
  public List<Dummy> updateDummies(@RequestBody List<Dummy> dummyList) {

    for (Dummy d : dummyList) {
      dummies.put(d.getUuid(), d);
    }

    return dummyList;
  }






}
