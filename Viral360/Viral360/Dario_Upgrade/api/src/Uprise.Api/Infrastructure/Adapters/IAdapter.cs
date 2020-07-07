using System;
using System.Collections.Generic;

namespace Uprise.Api.Infrastructure.Adapters
{
    interface IAdapter<T1, T2>
    {
        T1 GetById( int id, T2 t2 );

        IList<T1> List( T2 t2 );

        int Create( T1 t1, T2 t2 );

        void Update( T1 t1, T2 t2 );

        void Delete( int id, T2 t2 );
    }
}
