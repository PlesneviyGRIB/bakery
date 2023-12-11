package com.savchenko.backend.dao;

import com.savchenko.backend.dao.base.BaseDao;
import com.savchenko.backend.model.User;
import com.savchenko.backend.repository.UserRepository;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends BaseDao<UserRepository, User> {

}
