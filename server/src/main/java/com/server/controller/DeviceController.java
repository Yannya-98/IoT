package com.server.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.server.entity.Device;
import com.server.entity.User;
import com.server.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 设备表 前端控制器
 * </p>
 *
 * @author Yannya
 * @since 2024-01-02
 */
@CrossOrigin
@RestController
@RequestMapping("/device")
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    @GetMapping("/query/list/all/{username}")
    public List<Device> getListByUsername(@PathVariable String username) {
        QueryWrapper<Device> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        return deviceService.list(wrapper);
    }

    @GetMapping("/query/all/{username}")
    public long getTotal(@PathVariable String username) {
        QueryWrapper<Device> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        return deviceService.count(wrapper);
    }

    @GetMapping("/statistic/{username}")
    public List<Map<String, String>> getPieData(@PathVariable String username) {
        QueryWrapper<Device> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username);
        List<Map<String, String>> result = new ArrayList<>();
        List<Device> devices = deviceService.list(wrapper);
        String[] kind = {
                "车载设备", "可穿戴设备", "智能家居", "基础设施", "其他设备"
        };

        Integer[] count = {0, 0, 0, 0, 0};

        for (Device device : devices) {
            count[Integer.parseInt(device.getDeviceType()) - 1]++;
        }

        for (int i=0; i<5; i++){
            Map<String, String> item = new HashMap<>();
            item.put("type", kind[i]);
            item.put("value", String.valueOf(count[i]));
            result.add(item);
        }

        return result;
    }

    @PostMapping("/config")
    public boolean configDevice(@RequestBody Map<String, String> form) {
        QueryWrapper<Device> wrapper = new QueryWrapper<>();
        wrapper.eq("device_name", form.get("device"));
        Device device = deviceService.getBaseMapper().selectOne(wrapper);
        device.setDeviceType(form.get("type"));
        return deviceService.updateById(device);
    }

    @PostMapping("/new")
    public boolean newDevice(@RequestBody Device device) {
        System.out.println(device);
        QueryWrapper<Device> wrapper = new QueryWrapper<>();
        wrapper.eq("device_name", device.getDeviceName());
        if (deviceService.exists(wrapper)) {
            return false;
        } else {
            return deviceService.save(device);
        }
    }
}
