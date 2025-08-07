package com.hexaware.cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = {"http://localhost:3000", "https://*.spring.new"})
public class FeeController {
    
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllFees() {
        List<Map<String, Object>> fees = new ArrayList<>();
        
        Map<String, Object> fee1 = new HashMap<>();
        fee1.put("id", "1");
        fee1.put("studentId", "HMS001");
        fee1.put("studentName", "Rajesh Kumar");
        fee1.put("course", "Computer Science Engineering");
        fee1.put("semester", "Fall 2024");
        fee1.put("totalFees", 75000);
        fee1.put("feePaid", 50000);
        fee1.put("balanceDue", 25000);
        fee1.put("lastPaymentDate", "2024-01-15");
        fee1.put("lastPaymentAmount", 25000);
        fee1.put("paymentStatus", "Partial");
        fee1.put("dueDate", "2024-03-15");
        fees.add(fee1);
        
        Map<String, Object> fee2 = new HashMap<>();
        fee2.put("id", "2");
        fee2.put("studentId", "HMS002");
        fee2.put("studentName", "Priya Sharma");
        fee2.put("course", "Information Technology");
        fee2.put("semester", "Fall 2024");
        fee2.put("totalFees", 70000);
        fee2.put("feePaid", 70000);
        fee2.put("balanceDue", 0);
        fee2.put("lastPaymentDate", "2024-01-10");
        fee2.put("lastPaymentAmount", 35000);
        fee2.put("paymentStatus", "Paid");
        fee2.put("dueDate", "2024-01-31");
        fees.add(fee2);
        
        return ResponseEntity.ok(fees);
    }
    
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getFeesSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalFeesCollected", 245000);
        summary.put("totalOutstanding", 45000);
        summary.put("totalStudents", 8);
        summary.put("studentsWithOutstanding", 3);
        summary.put("collectionRate", 84.5);
        
        return ResponseEntity.ok(summary);
    }
}
