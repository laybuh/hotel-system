package edu.wgu.d387_sample_code;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TimeController {

    @GetMapping("/times")
    public List<String> getTimeZone() {
        return TimeService.getTimes();
    }
}