namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditedSharer : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Sharers", "Id", "dbo.AspNetUsers");
            DropIndex("dbo.Sharers", new[] { "Id" });
            DropPrimaryKey("dbo.Sharers");
            AddColumn("dbo.Sharers", "UserId_Id", c => c.Int());
            AlterColumn("dbo.Sharers", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Sharers", "Id");
            CreateIndex("dbo.Sharers", "UserId_Id");
            AddForeignKey("dbo.Sharers", "UserId_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sharers", "UserId_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Sharers", new[] { "UserId_Id" });
            DropPrimaryKey("dbo.Sharers");
            AlterColumn("dbo.Sharers", "Id", c => c.Int(nullable: false));
            DropColumn("dbo.Sharers", "UserId_Id");
            AddPrimaryKey("dbo.Sharers", "Id");
            CreateIndex("dbo.Sharers", "Id");
            AddForeignKey("dbo.Sharers", "Id", "dbo.AspNetUsers", "Id");
        }
    }
}
