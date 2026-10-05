package com.unigo.backend.model;

public class Listing {

    private Long id;
    private String image;
    private String title;
    private String category;
    private String condition;
    private String description;
    private String price;
    private String seller;
    private String college;
    private String postedAt;
    private boolean isFree;

    public Listing() {
    }

    public Listing(
            Long id,
            String image,
            String title,
            String category,
            String condition,
            String description,
            String price,
            String seller,
            String college,
            String postedAt,
            boolean isFree
    ) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.category = category;
        this.condition = condition;
        this.description = description;
        this.price = price;
        this.seller = seller;
        this.college = college;
        this.postedAt = postedAt;
        this.isFree = isFree;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(String postedAt) {
        this.postedAt = postedAt;
    }

    public boolean isFree() {
        return isFree;
    }

    public void setFree(boolean free) {
        isFree = free;
    }
}