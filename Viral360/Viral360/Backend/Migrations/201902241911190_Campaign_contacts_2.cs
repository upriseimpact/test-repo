namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Campaign_contacts_2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContactCampaigns",
                c => new
                    {
                        Contact_Id = c.Int(nullable: false),
                        Campaign_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Contact_Id, t.Campaign_Id })
                .ForeignKey("dbo.Contacts", t => t.Contact_Id, cascadeDelete: true)
                .ForeignKey("dbo.Campaigns", t => t.Campaign_Id, cascadeDelete: false)
                .Index(t => t.Contact_Id)
                .Index(t => t.Campaign_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ContactCampaigns", "Campaign_Id", "dbo.Campaigns");
            DropForeignKey("dbo.ContactCampaigns", "Contact_Id", "dbo.Contacts");
            DropIndex("dbo.ContactCampaigns", new[] { "Campaign_Id" });
            DropIndex("dbo.ContactCampaigns", new[] { "Contact_Id" });
            DropTable("dbo.ContactCampaigns");
        }
    }
}
