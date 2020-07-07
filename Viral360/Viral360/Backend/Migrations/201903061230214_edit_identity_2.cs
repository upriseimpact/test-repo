namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_identity_2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "OId", c => c.String());
            DropColumn("dbo.AspNetUsers", "KId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "KId", c => c.String());
            DropColumn("dbo.AspNetUsers", "OId");
        }
    }
}
