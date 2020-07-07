namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CampaignContacts3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CampaignContacts",
                c => new
                    {
                        CampaignId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.CampaignId, t.ContactId })
                .ForeignKey("dbo.Campaigns", t => t.CampaignId, cascadeDelete: true)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: false)
                .Index(t => t.CampaignId)
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CampaignContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CampaignContacts", "CampaignId", "dbo.Campaigns");
            DropIndex("dbo.CampaignContacts", new[] { "ContactId" });
            DropIndex("dbo.CampaignContacts", new[] { "CampaignId" });
            DropTable("dbo.CampaignContacts");
        }
    }
}
