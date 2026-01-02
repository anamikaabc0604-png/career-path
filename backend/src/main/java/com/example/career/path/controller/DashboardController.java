package com.example.career.path.controller;

import com.example.career.path.model.RoadmapStep;
import com.example.career.path.model.Skill;
import com.example.career.path.model.User;
import com.example.career.path.repository.RoadmapStepRepository;
import com.example.career.path.repository.SkillRepository;
import com.example.career.path.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow Frontend access
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private RoadmapStepRepository roadmapStepRepository;

    @GetMapping("/health")
    public String healthCheck() {
        return "Backend is running!";
    }

    // Initialize some dummy data for demo if DB is empty
    @PostMapping("/init")
    public String initData() {
        if (userRepository.count() == 0) {
            User user = new User("Anamika Singh", "anamika@example.com", "password", "Full Stack Developer");
            userRepository.save(user);

            skillRepository.save(new Skill("Java", "Advanced", "Backend", user));
            skillRepository.save(new Skill("React", "Beginner", "Frontend", user));
            skillRepository.save(new Skill("SQL", "Intermediate", "Database", user));
            
            return "Data Initialized";
        }
        return "Data already exists";
    }

    @GetMapping("/user/{email}")
    public User getUser(@PathVariable String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @GetMapping("/skills/{userId}")
    public List<Skill> getUserSkills(@PathVariable Long userId) {
        return skillRepository.findByUserId(userId);
    }

    @PostMapping("/skills/add/{userId}")
    public Skill addSkill(@PathVariable Long userId, @RequestBody Skill skill) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    @PutMapping("/skills/update/{skillId}")
    public Skill updateSkill(@PathVariable Long skillId, @RequestBody Map<String, String> updates) {
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));
        if (updates.containsKey("level")) {
            skill.setLevel(updates.get("level"));
        }
        return skillRepository.save(skill);
    }

    @GetMapping("/roadmap/{userId}")
    public List<RoadmapStep> getRoadmap(@PathVariable Long userId) {
        return roadmapStepRepository.findByUserId(userId);
    }

    @PostMapping("/roadmap/add/{userId}")
    public RoadmapStep addRoadmapStep(@PathVariable Long userId, @RequestBody RoadmapStep step) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        step.setUser(user);
        return roadmapStepRepository.save(step);
    }

    @PutMapping("/roadmap/update/{stepId}")
    public RoadmapStep updateRoadmapStep(@PathVariable Long stepId, @RequestBody Map<String, String> updates) {
        RoadmapStep step = roadmapStepRepository.findById(stepId).orElseThrow(() -> new RuntimeException("Step not found"));
        if (updates.containsKey("status")) step.setStatus(updates.get("status"));
        if (updates.containsKey("title")) step.setTitle(updates.get("title"));
        if (updates.containsKey("description")) step.setDescription(updates.get("description"));
        if (updates.containsKey("duration")) step.setDuration(updates.get("duration"));
        if (updates.containsKey("topics")) step.setTopics(updates.get("topics"));
        return roadmapStepRepository.save(step);
    }

    @DeleteMapping("/roadmap/delete/{stepId}")
    public void deleteRoadmapStep(@PathVariable Long stepId) {
        roadmapStepRepository.deleteById(stepId);
    }
}
