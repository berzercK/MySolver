package com.netcracker.students.BatyrkinAndrew.servlets;

import com.google.gson.Gson;
import com.netcracker.students.BatyrkinAndrew.helps.Result;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/CalculatorServlet")
public class CalculatorServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/plain");
        Gson gson = new Gson();
        resp.getWriter().println(gson.toJson(calculate(req)));
    }

    private Result calculate(HttpServletRequest req) {
        double a = Double.parseDouble(req.getParameter("a"));
        double b = Double.parseDouble(req.getParameter("b"));
        double c = Double.parseDouble(req.getParameter("c"));
        double d = Math.pow(b, 2) - 4 * a * c;
        double[] result = new double[3]; //{ x1, x2, dis}
        Result myRes = new Result();

        if (d >= 0) {
            result[0] = ((-1) * b + Math.sqrt(d)) / 2 * a;
            result[1] = ((-1) * b - Math.sqrt(d)) / 2 * a;
        } else {
            result[0] = 0;
            result[1] = 0;
        }

        result[2] = d;
        myRes.set(result[0], result[1], result[2]);

        return myRes;
    }
}
