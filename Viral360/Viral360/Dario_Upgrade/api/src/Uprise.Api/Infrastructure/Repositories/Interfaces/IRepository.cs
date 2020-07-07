namespace Uprise.Api.Infrastructure.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        T GetById( int id );

        int Create( T entity );

        void Delete( T entity );

        void Update( T entity );
    }
}
