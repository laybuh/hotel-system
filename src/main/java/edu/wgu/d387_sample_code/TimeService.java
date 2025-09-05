package edu.wgu.d387_sample_code;

import java.util.*;
import java.time.*;
import java.time.format.*;

public class TimeService {

    public static List<String> getTimes() {
        LocalDateTime eventTime = LocalDateTime.of(2024, 12, 15, 16, 0);

        ZonedDateTime etTime = eventTime.atZone(ZoneId.of("America/New_York"));
        ZonedDateTime mtTime = etTime.withZoneSameInstant(ZoneId.of("America/Denver"));
        ZonedDateTime utcTime = etTime.withZoneSameInstant(ZoneId.of("UTC"));

        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm");

        String etResult = "ET: " + etTime.format(timeFormat);
        String mtResult = "MT: " + mtTime.format(timeFormat);
        String utcResult = "UTC: " + utcTime.format(timeFormat);

        List<String> timezones = new ArrayList<>();
        timezones.add(etResult);
        timezones.add(mtResult);
        timezones.add(utcResult);

        return timezones;
    }
}