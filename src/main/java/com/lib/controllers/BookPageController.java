package com.lib.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping(value="book", method = {RequestMethod.GET, RequestMethod.POST})
public class BookPageController {

    @GetMapping("")
    public String displayBookPage (Model model) {
        return "book/index";
    }
}
