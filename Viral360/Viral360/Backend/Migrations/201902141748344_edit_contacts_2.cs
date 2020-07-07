namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_contacts_2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Contacts", "IX_UniqueEmailDistributor");
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Contacts", "FirstName", c => c.String());
            AlterColumn("dbo.Contacts", "Age", c => c.Int());
            AlterColumn("dbo.Contacts", "Gender", c => c.Int());
            CreateIndex("dbo.Contacts", "DistributorId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Contacts", new[] { "DistributorId" });
            AlterColumn("dbo.Contacts", "Gender", c => c.Int(nullable: false));
            AlterColumn("dbo.Contacts", "Age", c => c.Int(nullable: false));
            AlterColumn("dbo.Contacts", "FirstName", c => c.String(nullable: false));
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Contacts", new[] { "DistributorId", "Email" }, unique: true, name: "IX_UniqueEmailDistributor");
        }
    }
}
