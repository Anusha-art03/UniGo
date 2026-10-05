package com.unigo.backend.repository;

import com.unigo.backend.model.Listing;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ListingRepository {

    private final ConcurrentHashMap<Long, Listing> listings = new ConcurrentHashMap<>();

    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Listing> findAll() {
        return new ArrayList<>(listings.values());
    }

    public Listing findById(Long id) {
        return listings.get(id);
    }

    public Listing save(Listing listing) {

        if (listing.getId() == null) {
            listing.setId(idGenerator.getAndIncrement());
        }

        listings.put(listing.getId(), listing);

        return listing;
    }

    public boolean existsById(Long id) {
        return listings.containsKey(id);
    }

    public void deleteById(Long id) {
        listings.remove(id);
    }
}