package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LandingController  {

    @GetMapping
    public String displayLanding () {
        return "index";
    }

}
