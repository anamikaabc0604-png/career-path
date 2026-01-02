package com.example.career.path.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roadmap_steps")
public class RoadmapStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;
    private String status; // completed, in-progress, pending
    private String duration;
    private String topics; // comma separated topics

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public RoadmapStep() {}

    public RoadmapStep(String title, String description, String status, String duration, String topics, User user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.duration = duration;
        this.topics = topics;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getTopics() { return topics; }
    public void setTopics(String topics) { this.topics = topics; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
