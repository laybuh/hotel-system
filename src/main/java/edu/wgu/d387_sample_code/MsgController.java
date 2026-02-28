package edu.wgu.d387_sample_code;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MsgController {

    @GetMapping("/welcome")
    public List<String> getMsg() {
        return WelcomeService.getWelcomeMsg();
    }
}