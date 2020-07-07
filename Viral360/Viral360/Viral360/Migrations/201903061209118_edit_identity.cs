namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_identity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "KId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "KId");
        }
    }
}
