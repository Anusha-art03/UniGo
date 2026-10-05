package com.unigo.backend.controller;

import com.unigo.backend.model.Listing;
import com.unigo.backend.service.ListingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    // GET /api/listings
    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    // GET /api/listings/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long id) {

        Listing listing = listingService.getListingById(id);

        if (listing == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(listing);
    }

    // POST /api/listings
    @PostMapping
    public ResponseEntity<Listing> createListing(
            @RequestBody Listing listing
    ) {

        Listing createdListing = listingService.createListing(listing);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdListing);
    }

    // PUT /api/listings/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(
            @PathVariable Long id,
            @RequestBody Listing listing
    ) {

        Listing updatedListing =
                listingService.updateListing(id, listing);

        if (updatedListing == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedListing);
    }

    // DELETE /api/listings/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(
            @PathVariable Long id
    ) {

        boolean deleted = listingService.deleteListing(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}