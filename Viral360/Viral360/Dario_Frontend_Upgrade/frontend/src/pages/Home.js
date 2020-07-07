import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';

import { DatePicker } from "@material-ui/pickers";

import Badge from '../components/Badge';
import Card from '../components/Card';
import DemoAge from '../components/DemoAge';
import DemoGender from '../components/DemoGender';
import DemoMap from '../components/DemoMap';
import DemoReach from '../components/DemoReach';
import LeaderboardItem from '../components/LeaderboardItem';

import RedoOutlined from '@material-ui/icons/RedoOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: '#f9f9f9',
    marginTop: theme.spacing(6),
  },
  deshboardSectionTitle: {
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '25px',
    textTransform: 'uppercase',
  }
}));

function Home() {
  async function refreshData() {
    // TODO - load data from the backend here
  }

  useEffect(() =>{
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  // const [date, changeDate] = useState(new Date());

  // TODO - find a better layout solution on smaller screens
  // Commented out parts need adjustment to appear correctly on larger screens

  return (
    <div className={classes.heroContent}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div className={classes.deshboardSectionTitle}>
            General dashboard
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <Card>
                <Badge
                  icon={<RedoOutlined fontSize="large" color="primary" />}
                  label="3000"
                  description="TOTAL SHARES"
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Card>
                <Badge
                  icon={<ThumbUpOutlinedIcon fontSize="large" color="primary" />}
                  label="244,000"
                  description="TOTAL LIKES"
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Card>
                <Badge
                  icon={<VisibilityOutlinedIcon fontSize="large" color="primary" />}
                  label="1,044,000"
                  description="TOTAL VIEWS"
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
              <Card>
                <Badge
                  icon={<QuestionAnswerIcon fontSize="large" color="primary" />}
                  label="7,300"
                  description="TOTAL COMMENTS"
                />
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card style={{height: '600px'}}>
                <DemoReach />
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card style={{height: '600px'}}>
                Leaderboard
                <br />
                <br />
                <LeaderboardItem
                  imageUrl="https://material-ui.com/static/images/avatar/1.jpg"
                  name="Henri Aubert"
                  rising={true}
                  number={3784}
                />
                <LeaderboardItem
                  imageUrl="https://material-ui.com/static/images/avatar/2.jpg"
                  name="Jerome Porter"
                  rising={true}
                  number={3544}
                />
                <LeaderboardItem
                  imageUrl="https://material-ui.com/static/images/avatar/3.jpg"
                  name="Kate Cook"
                  rising={false}
                  number={2739}
                />
                <LeaderboardItem
                  imageUrl="https://material-ui.com/static/images/avatar/5.jpg"
                  name="Antonio Steine"
                  rising={false}
                  number={1032}
                />
                <LeaderboardItem
                  imageUrl="https://material-ui.com/static/images/avatar/4.jpg"
                  name="Brittany Hansen"
                  rising={false}
                  number={1332}
                />
              </Card>
            </Grid>
          </Grid>

          {/* <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Card>
                <DemoMap />
              </Card>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Card>
                <DemoAge />
              </Card>
            </Grid>
            <Grid item xs={12} lg={1}>
            <Card>
                <DemoGender />
              </Card>
            </Grid>
          </Grid> */}
        </Grid>
        
        {/* <Grid item xs={12} md={3}>
          <div className={classes.deshboardSectionTitle}>
            Campaign calendar
          </div>
          <Card>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={date}
              onChange={changeDate}
            />
          </Card>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Home;
