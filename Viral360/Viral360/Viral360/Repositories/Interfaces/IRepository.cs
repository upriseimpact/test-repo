﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Uprise.Repositories.Interfaces
{
    interface IRepository<T> where T : class
    {
        T GetById(int id);

        int Create(T entity);

        void Delete(T entity);

        void Update(T entity);
    }
}
