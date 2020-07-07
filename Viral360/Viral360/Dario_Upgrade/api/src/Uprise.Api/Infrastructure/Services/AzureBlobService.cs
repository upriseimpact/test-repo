using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Uprise.Api.Infrastructure.Services
{
    public class AzureBlobService
    {
        private readonly string _azureConnectionString;

        const string blobContainerName = "uprise";

        static CloudBlobClient blobClient;
        static CloudBlobContainer blobContainer;


        public AzureBlobService( string azureConnectionString )
        {
            _azureConnectionString = azureConnectionString ?? throw new ArgumentNullException( nameof( azureConnectionString ) );
        }


        public async Task<string> UploadPostImage( int distributorId, int postId, string fileName, Stream stream )
        {
            //var url = "";
            try
            {
                await ConnectToBlobStorageAsync();
                CloudBlockBlob blob = blobContainer.GetBlockBlobReference( GetRandomBlobName( distributorId, postId, fileName ) );
                await blob.UploadFromStreamAsync( stream );
                return blob.Uri.ToString();
            }
            catch ( Exception ex )
            {
                throw new Exception( ex.Message );
            }
        }

        private string GetRandomBlobName( int distributorId, int postId, string filename )
        {
            string ext = Path.GetExtension( filename );
            return string.Format( "{0}_{1}{2}", distributorId.ToString(), postId.ToString(), ext );
        }

        private async Task ConnectToBlobStorageAsync()
        {
            try
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse( _azureConnectionString );

                // Create a blob client for interacting with the blob service.
                blobClient = storageAccount.CreateCloudBlobClient();
                blobContainer = blobClient.GetContainerReference( blobContainerName );
                await blobContainer.CreateIfNotExistsAsync();

                await blobContainer.SetPermissionsAsync( new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob } );
            }
            catch ( Exception ex )
            {
                throw new Exception( ex.Message );
            }
        }
    }
}
