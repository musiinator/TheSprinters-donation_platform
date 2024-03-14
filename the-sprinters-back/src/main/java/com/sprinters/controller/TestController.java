package com.sprinters.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping(path = "/test")
    public String test() {
        return "Test";
    }

    @GetMapping(path = "/auth-test")
    public String authTest() {
        return "AuthTest";
    }
}
