package com.hexaware.cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.spring.new"})
public class CourseController {
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
        List<Map<String, Object>> courses = new ArrayList<>();
        
        Map<String, Object> course1 = new HashMap<>();
        course1.put("id", "1");
        course1.put("courseCode", "CSE301");
        course1.put("courseName", "Advanced Data Structures");
        course1.put("department", "Computer Science");
        course1.put("credits", 4);
        course1.put("duration", "16 weeks");
        course1.put("instructor", "Dr. Vikas Kumar");
        course1.put("schedule", "Mon, Wed, Fri 9:00-10:30 AM");
        course1.put("classroom", "Room A-101");
        course1.put("description", "Advanced concepts in data structures and algorithms");
        course1.put("prerequisites", "CSE201 - Basic Data Structures");
        course1.put("enrolledStudents", 28);
        course1.put("maxCapacity", 35);
        course1.put("semester", "Fall 2024");
        courses.add(course1);
        
        Map<String, Object> course2 = new HashMap<>();
        course2.put("id", "2");
        course2.put("courseCode", "CSE401");
        course2.put("courseName", "Database Management Systems");
        course2.put("department", "Computer Science");
        course2.put("credits", 3);
        course2.put("duration", "16 weeks");
        course2.put("instructor", "Prof. Hexaware Singh");
        course2.put("schedule", "Tue, Thu 2:00-3:30 PM");
        course2.put("classroom", "Room B-205");
        course2.put("description", "Comprehensive study of database design and management");
        course2.put("prerequisites", "CSE202 - Introduction to Databases");
        course2.put("enrolledStudents", 32);
        course2.put("maxCapacity", 40);
        course2.put("semester", "Fall 2024");
        courses.add(course2);
        
        return ResponseEntity.ok(courses);
    }
}
