package edu.wgu.d387_sample_code;

import java.util.*;
import java.util.concurrent.*;

public class WelcomeService implements Runnable {
    private Locale locale;
    private List<String> msg;

    public WelcomeService(Locale locale, List<String> msg) {
        this.locale = locale;
        this.msg = msg;
    }

    @Override
    public void run() {
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        String welcomeMessage = bundle.getString("welcome.message");
        msg.add(welcomeMessage);
    }

    public static List<String> getWelcomeMsg() {
        List<String> msg = new CopyOnWriteArrayList<>();

        Thread englishTask = new Thread(new WelcomeService(Locale.ENGLISH, msg));
        Thread frenchTask = new Thread(new WelcomeService(Locale.FRENCH, msg));

        englishTask.start();
        frenchTask.start();

        try {
            englishTask.join();
            frenchTask.join();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }

        return msg;
    }
}