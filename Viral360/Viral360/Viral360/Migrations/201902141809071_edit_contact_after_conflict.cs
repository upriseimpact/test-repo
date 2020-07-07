namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_contact_after_conflict : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Contacts", new[] { "DistributorId" });
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Contacts", new[] { "DistributorId", "Email" }, unique: true, name: "IX_UniqueEmailDistributor");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Contacts", "IX_UniqueEmailDistributor");
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false));
            CreateIndex("dbo.Contacts", "DistributorId");
        }
    }
}
