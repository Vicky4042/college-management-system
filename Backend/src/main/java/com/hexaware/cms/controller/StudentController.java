package com.hexaware.cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.spring.new"})
public class StudentController {
    
    @GetMapping("/students")
    public ResponseEntity<List<Map<String, Object>>> getAllStudents() {
        List<Map<String, Object>> students = new ArrayList<>();
        
        Map<String, Object> student1 = new HashMap<>();
        student1.put("id", "1");
        student1.put("studentId", "HMS001");
        student1.put("studentName", "Rajesh Kumar");
        student1.put("course", "Computer Science Engineering");
        student1.put("semester", "Fall 2024");
        student1.put("email", "rajesh@hexaware.college");
        student1.put("department", "Computer Science");
        students.add(student1);
        
        Map<String, Object> student2 = new HashMap<>();
        student2.put("id", "2");
        student2.put("studentId", "HMS002");
        student2.put("studentName", "Priya Sharma");
        student2.put("course", "Information Technology");
        student2.put("semester", "Fall 2024");
        student2.put("email", "priya@hexaware.college");
        student2.put("department", "Information Technology");
        students.add(student2);
        
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/marks/search")
    public ResponseEntity<List<Map<String, Object>>> searchMarks(@RequestParam String q) {
        List<Map<String, Object>> results = new ArrayList<>();
        
        if (!q.trim().isEmpty()) {
            Map<String, Object> studentMark = new HashMap<>();
            studentMark.put("id", "1");
            studentMark.put("studentId", "HMS001");
            studentMark.put("studentName", "Rajesh Kumar");
            studentMark.put("course", "Computer Science Engineering");
            studentMark.put("semester", "Fall 2024");
            studentMark.put("totalMarks", 470);
            studentMark.put("maxTotalMarks", 500);
            studentMark.put("percentage", 94.0);
            studentMark.put("gpa", 3.9);
            
            List<Map<String, Object>> subjects = new ArrayList<>();
            
            Map<String, Object> subject1 = new HashMap<>();
            subject1.put("name", "Data Structures");
            subject1.put("marks", 98);
            subject1.put("totalMarks", 100);
            subject1.put("grade", "A+");
            subjects.add(subject1);
            
            Map<String, Object> subject2 = new HashMap<>();
            subject2.put("name", "Database Management");
            subject2.put("marks", 92);
            subject2.put("totalMarks", 100);
            subject2.put("grade", "A+");
            subjects.add(subject2);
            
            Map<String, Object> subject3 = new HashMap<>();
            subject3.put("name", "Web Development");
            subject3.put("marks", 89);
            subject3.put("totalMarks", 100);
            subject3.put("grade", "A");
            subjects.add(subject3);
            
            studentMark.put("subjects", subjects);
            results.add(studentMark);
        }
        
        return ResponseEntity.ok(results);
    }
}
