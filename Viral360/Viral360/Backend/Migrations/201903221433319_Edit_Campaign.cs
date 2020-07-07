namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Edit_Campaign : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Campaigns", "LaunchDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Campaigns", "LaunchDate");
        }
    }
}
