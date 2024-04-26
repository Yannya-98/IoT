package com.server.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.server.entity.Device;
import com.server.entity.Message;
import com.server.entity.User;
import com.server.service.DeviceService;
import com.server.service.MessageService;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 消息表 前端控制器
 * </p>
 *
 * @author Yannya
 * @since 2024-01-02
 */
@CrossOrigin
@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;
    @Autowired
    private DeviceService deviceService;

    @GetMapping(value = "/info/{deviceName}")
    public List<Message> getDevicePosition(@PathVariable String deviceName) {
        QueryWrapper<Message> wrapper = new QueryWrapper<>();
        wrapper.eq("device_name", deviceName);
        List<Message> result = messageService.list(wrapper);
        result.sort(Comparator.comparing(Message::getTimeStamp));
        if (result.size() >= 10) {
            int size = result.size();
            result = result.subList(size - 10, size);
        }
        return result;
    }

    @GetMapping("/user/all/{username}")
    public long getTotal(@PathVariable String username) {
        long count = 0;
        QueryWrapper<Device> deviceQueryWrapper = new QueryWrapper<>();
        QueryWrapper<Message> messageQueryWrapper = new QueryWrapper<>();

        deviceQueryWrapper.eq("username", username);
        List<Device> devices = deviceService.list(deviceQueryWrapper);

        for (Device device : devices) {
            messageQueryWrapper.eq("device_name", device.getDeviceName());
            long messageCount = messageService.count(messageQueryWrapper);
            count += messageCount;
        }

        return count;
    }
}
