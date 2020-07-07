using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Configuration;
using System.Web;

namespace Uprise.Helpers
{
    public static class ConnectToAzure
    {
        const string blobContainerName = "uprise";

        static CloudBlobClient blobClient;
        static CloudBlobContainer blobContainer;

        public static string UploadPostImage(int distributorId, int postId, string fileName, Stream stream)
        {
            //var url = "";
            try
            {
                ConnectToBlobStorage();
                CloudBlockBlob blob = blobContainer.GetBlockBlobReference(GetRandomBlobName(distributorId, postId, fileName));
                blob.UploadFromStream(stream);//.UploadFromFileAsync(fileName);
                return blob.Uri.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private static string GetRandomBlobName(int distributorId, int postId, string filename)
        {
            string ext = Path.GetExtension(filename);
            return string.Format("{0}_{1}{2}", distributorId.ToString(), postId.ToString(), ext);
        }

        private static void ConnectToBlobStorage()
        {
            try
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["uprise_AzureStorageConnectionString"].ToString());

                // Create a blob client for interacting with the blob service.
                blobClient = storageAccount.CreateCloudBlobClient();
                blobContainer = blobClient.GetContainerReference(blobContainerName);
                blobContainer.CreateIfNotExists();

                blobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}