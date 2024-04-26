package com.server.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.server.entity.User;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author Yannya
 * @since 2024-01-02
 */
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public List<User> userList(){
        return userService.list();
    }

    @PostMapping("/save")
    public boolean save(@RequestBody User user){
        return userService.save(user);
    }

    @PostMapping("/mod")
    public boolean mod(@RequestBody User user){
        return userService.updateById(user);
    }

    @PostMapping("/saveOrMod")
    public boolean saveOrMod(@RequestBody User user){
        return userService.saveOrUpdate(user);
    }

    @GetMapping("/delete")
    public boolean delete(Integer id){
        return userService.removeById(id);
    }

    @PostMapping("/qList")
    public List<User> qList(@RequestBody User user){
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(User::getUsername, user.getUsername());
        return userService.list(lambdaQueryWrapper);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody User user) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", user.getUsername())
                .eq("password", user.getPassword());
        return userService.exists(wrapper);
    }

    @PostMapping("/register")
    public Integer register(@RequestBody User user) {
        QueryWrapper<User> wrapper1 = new QueryWrapper<>();
        QueryWrapper<User> wrapper2 = new QueryWrapper<>();
        wrapper1.eq("username", user.getUsername());
        wrapper2.eq("email", user.getEmail());
        if (userService.exists(wrapper1)) {
            return -1;
        } else if (userService.exists(wrapper2)) {
            return -2;
        }
        userService.save(user);
        return 1;
    }


    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        return userService.getBaseMapper().selectOne(wrapper);
    }

    @PostMapping("/config/password")
    public boolean configPassword(@RequestBody Map<String, String> form) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", form.get("username"));
        User _user = userService.getBaseMapper().selectOne(wrapper);
        if (form.get("old").equals(_user.getPassword())){
            _user.setPassword(form.get("password"));
            return userService.updateById(_user);
        }else {
            return false;
        }
    }

    @PostMapping("/config/info")
    public Integer configInfo(@RequestBody Map<String, String> form) {
        QueryWrapper<User> wrapper1 = new QueryWrapper<>();
        wrapper1.eq("username", form.get("username"));
        User _user = userService.getBaseMapper().selectOne(wrapper1);
        QueryWrapper<User> wrapper2 = new QueryWrapper<>();
        wrapper2.eq("username", form.get("newname"));
        QueryWrapper<User> wrapper3 = new QueryWrapper<>();
        wrapper3.eq("email", form.get("email"));
        if ((!form.get("newname").equals(_user.getUsername())) && userService.exists(wrapper2)){
            return -2;
        }
        else if ((!form.get("email").equals(_user.getEmail())) && userService.exists(wrapper3)){
            return -1;
        }
        else{
            _user.setUsername(form.get("newname"));
            _user.setEmail(form.get("email"));
            userService.updateById(_user);
            return 1;
        }
    }
}
