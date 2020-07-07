using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Repositories;
using Uprise.Api.Infrastructure.Uploads;
using Uprise.Api.ViewModels;

namespace Uprise.Api.Infrastructure.Adapters
{
    public class ContactAdapter : IAdapter<ContactViewModel, Distributor>
    {
        private UpriseContext _databaseContext;
        private ContactRepository _contactRepository;

        public ContactAdapter
        (
            UpriseContext databaseContext,
            ContactRepository contactRepository
        )
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException( nameof( databaseContext ) );
            _contactRepository = contactRepository ?? throw new ArgumentNullException( nameof( contactRepository ) );
        }


        public ContactViewModel GetById( int id, Distributor distributor )
        {
            Contact contact = _contactRepository.GetById( id );

            if ( contact == null )
            {
                throw new Exception( "No contacts associated to this user." );
            }

            if ( contact.DistributorId != distributor.Id )
            {
                throw new Exception( string.Format( "The contact with Id: {0} does not belong to this user.", id ) );
            }

            try
            {
                var contactToReturn = new ContactViewModel();
                MapModelToViewModel( contact, ref contactToReturn );
                return contactToReturn;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public IList<ContactViewModel> List( Distributor distributor )
        {
            var contacts = _contactRepository.FilterBy( c => c.DistributorId == distributor.Id );

            if ( contacts == null )
            {
                throw new Exception( "No contacts associated to this user." );
            }

            try
            {
                var contactsList = new List<ContactViewModel>();
                foreach ( var contact in contacts )
                {
                    var contactViewModel = new ContactViewModel();
                    MapModelToViewModel( contact, ref contactViewModel );
                    contactsList.Add( contactViewModel );
                }

                return contactsList;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public int Create( ContactViewModel contactViewModel, Distributor distributor )
        {
            try
            {
                var contactToCreate = new Contact();
                contactToCreate.DistributorId = distributor.Id;
                MapViewModelToModel( contactViewModel, ref contactToCreate );

                return _contactRepository.Create( contactToCreate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void Update( ContactViewModel contactViewModel, Distributor distributor )
        {

            try
            {
                var contactToUpdate = _contactRepository.GetById( contactViewModel.Id );

                if ( contactToUpdate.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The contact with Id: {0} doen not belong to this user.", contactViewModel.Id ) );
                }

                MapViewModelToModel( contactViewModel, ref contactToUpdate );

                _contactRepository.Update( contactToUpdate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void Delete( int id, Distributor distributor )
        {
            try
            {
                var contactToDelete = _contactRepository.GetById( id );

                if ( contactToDelete.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The contact with Id: {0} does not belong to this user.", distributor.Id ) );
                }

                _contactRepository.Delete( contactToDelete );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void AddContacts( IFormFile contactsFile, Distributor distributor )
        {
            var currentRecord = "";
            try
            {
                if ( !contactsFile.FileName.EndsWith( ".csv" ) )
                {
                    throw new Exception( "Only CSV files are supported." );
                }
                Stream stream = contactsFile.OpenReadStream();

                using ( var streamReader = new StreamReader( stream ) )
                {
                    var headerLine = streamReader.ReadLine();

                    while ( !streamReader.EndOfStream )
                    {
                        var record = streamReader.ReadLine();
                        currentRecord = record;
                        var uploadedContact = UploadedContact.FromCsv( record );

                        var contact = new Contact
                        {
                            DistributorId = distributor.Id
                        };

                        if ( Enum.TryParse( uploadedContact.Platform, out Platform platform ) )
                        {
                            contact.Platform = platform;
                        }
                        contact.Email = uploadedContact.Email;
                        contact.FirstName = uploadedContact.FirstName;
                        contact.LastName = uploadedContact.LastName;
                        contact.Country = uploadedContact.Country;
                        contact.City = uploadedContact.City;
                        contact.Age = uploadedContact.Age;
                        _contactRepository.Create( contact );
                    }
                }
            }
            catch ( Exception exception )
            {
                throw new Exception( String.Format( "Processing record: {0}. All records above this one were added to the database, so delete them form the sheet before trying to upload again. Exception thrown: ", currentRecord )  + exception.Message );
            }
        }

        private void MapViewModelToModel( ContactViewModel contactViewModel, ref Contact contact )
        {
            contact.Age = contactViewModel.Age;
            contact.Country = contactViewModel.Country;
            contact.City = contactViewModel.City;
            contact.Province = contactViewModel.Province;
            contact.FirstName = contactViewModel.FirstName;
            contact.LastName = contactViewModel.LastName;
            contact.Platform = contactViewModel.Platform;
            contact.Gender = contactViewModel.Gender;
        }

        private void MapModelToViewModel( Contact contact, ref ContactViewModel contactViewModel )
        {
            contactViewModel.Age = contact.Age;
            contactViewModel.Country = contact.Country;
            contactViewModel.City = contact.City;
            contactViewModel.Province = contact.Province;
            contactViewModel.FirstName = contact.FirstName;
            contactViewModel.LastName = contact.LastName;
            contactViewModel.Platform = contact.Platform;
            contactViewModel.Gender = contact.Gender;
        }
    }
}
