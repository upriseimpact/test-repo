namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Contacts", "Email", c => c.String(nullable: false, maxLength: 100));
        }
    }
}
