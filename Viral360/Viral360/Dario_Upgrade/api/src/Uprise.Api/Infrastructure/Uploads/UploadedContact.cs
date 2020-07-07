using System;

namespace Uprise.Api.Infrastructure.Uploads
{
    public class UploadedContact
    {
        public String Platform { get; set; }
        public String Email { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Country { get; set; }
        public String City { get; set; }
        public String Gender { get; set; }
        public int Age { get; set; }

        public static UploadedContact FromCsv( string csvLine )
        {
            string [ ] values = csvLine.Split( ',' );
            UploadedContact uploadedContact = new UploadedContact
            {
                Platform = values [ 0 ],
                Email = values [ 1 ],
                FirstName = values [ 2 ],
                LastName = values [ 3 ],
                Country = values [ 4 ],
                City = values [ 5 ],
                Gender = values [ 6 ]
            };
            if ( Int16.TryParse( values [ 7 ], out short age ) )
                uploadedContact.Age = age;
            return uploadedContact;
        }
    }
}
