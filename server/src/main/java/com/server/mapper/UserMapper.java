package com.server.mapper;

import com.server.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 用户表 Mapper 接口
 * </p>
 *
 * @author Yannya
 * @since 2024-01-02
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
