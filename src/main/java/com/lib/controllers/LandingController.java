package com.lib.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LandingController  {

    @GetMapping
    public String displayLanding (Model model) {
        return "index";
    }

}
