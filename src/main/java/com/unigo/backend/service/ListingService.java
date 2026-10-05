package com.unigo.backend.service;

import com.unigo.backend.model.Listing;
import com.unigo.backend.repository.ListingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListingService {

    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public List<Listing> getAllListings() {
        return listingRepository.findAll();
    }

    public Listing getListingById(Long id) {
        return listingRepository.findById(id);
    }

    public Listing createListing(Listing listing) {

        // Ignore any ID coming from the frontend.
        // Java backend generates the ID.
        listing.setId(null);

        return listingRepository.save(listing);
    }

    public Listing updateListing(Long id, Listing updatedListing) {

        Listing existingListing = listingRepository.findById(id);

        if (existingListing == null) {
            return null;
        }

        updatedListing.setId(id);

        return listingRepository.save(updatedListing);
    }

    public boolean deleteListing(Long id) {

        if (!listingRepository.existsById(id)) {
            return false;
        }

        listingRepository.deleteById(id);

        return true;
    }
}