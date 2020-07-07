namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_contacts_3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Contacts", "Platform", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Contacts", "Platform", c => c.Int(nullable: false));
        }
    }
}
