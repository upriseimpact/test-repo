namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CampaignEmailRresponse2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CampaignEmailResponses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CampaignId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                        Response = c.String(unicode: false, storeType: "text"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campaigns", t => t.CampaignId, cascadeDelete: true)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: false)
                .Index(t => t.CampaignId)
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CampaignEmailResponses", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.CampaignEmailResponses", "CampaignId", "dbo.Campaigns");
            DropIndex("dbo.CampaignEmailResponses", new[] { "ContactId" });
            DropIndex("dbo.CampaignEmailResponses", new[] { "CampaignId" });
            DropTable("dbo.CampaignEmailResponses");
        }
    }
}
