package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="search", method = {RequestMethod.GET, RequestMethod.POST})
public class SearchPageController {

    @GetMapping("")
    public String displaySearchResults () {
        return "search/index";
    }
}
