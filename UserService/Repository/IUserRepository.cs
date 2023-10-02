﻿using UserService.Models;

namespace UserService.Repository
{
    public interface IUserRepository
    {
        void CreateUser(User user);
        User GetUserByUserEmailId(string emailId);
        List<User> GetAllUsers();
        void UpdateName(string userEmailId, string name);
        void UpdatePassword(string userEmailId, string password);
        void UpdateMobileNo(string userEmailId, long mobileNo);
        void UpdateUserImage(string userEmailId, byte[] userImage);
        void UpdateAddress(string userEmailId, Address address);
        Address GetAddress(string userEmailId);
    }
}
