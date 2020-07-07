using Microsoft.EntityFrameworkCore;

namespace Uprise.Api.Domain
{
    public class UpriseContext : DbContext
    {
        public DbSet<Tag> Tag { get; set; }
        public DbSet<DistributorStatus> DistributorStatus { get; set; }
        public DbSet<Distributor> Distributor { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<Sharer> Sharer { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<CampaignTags> CampaignTags { get; set; }
        public DbSet<EmailMessage> EmailMessages { get; set; }
        public DbSet<Industry> Industries { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<CampaignEmailResponse> CampaignEmailResponses { get; set; }
        public DbSet<CampaignContacts> CampaignContacts { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }


        public UpriseContext( DbContextOptions<UpriseContext> options ) : base( options ) { }


        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            // Use FluentAPI to setup constraints a validations
            modelBuilder.Entity<CampaignTags>()
                .HasKey( c => new { c.TagId, c.CampaignId } );

            modelBuilder.Entity<PostTag>()
                .HasKey( c => new { c.PostId, c.TagId } );

            modelBuilder.Entity<Distributor>()
                .HasIndex( u => u.UserId )
                .IsUnique();

            modelBuilder.Entity<Distributor>()
                .HasOne( d => d.DistributorStatus )
                .WithMany( s => s.Distributors )
                .HasForeignKey( d => d.StatusId );

            modelBuilder.Entity<CampaignContacts>()
                .HasKey( c => new { c.CampaignId, c.ContactId } );
        }
    }
}
